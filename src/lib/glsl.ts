export const vertexShader = `
precision mediump float;
varying vec2 vUv;

attribute vec3 aInitialPosition;
attribute float aMeshSpeed;
attribute vec4 aTextureCoords;
attribute float aImageAspect;

uniform float uTime;
uniform vec2 uMaxXdisplacement;
uniform vec2 uDrag;
uniform float uScrollY;

varying float vAlpha;
varying vec4 vTextureCoords;
varying float vImageAspect;

void main()
{     
    vec3 newPosition = position + aInitialPosition;

    vec2 maxOffset = uMaxXdisplacement;
    
    // Vectorized displacements
    vec2 displacement = mod(
        maxOffset - vec2(uDrag.x - uTime * aMeshSpeed, uDrag.y), 
        maxOffset * 2.0
    ) - maxOffset;

    float maxZ = 12.0;
    float minZ = -30.0;
    float zRange = maxZ - minZ;
    
    float zDisplacement = mod(uScrollY - minZ, zRange) + minZ - aInitialPosition.z;
    
    newPosition.xy += displacement;
    newPosition.z += zDisplacement;

    // Linear visibility gradient (Z-depth)
    float visibility = clamp((newPosition.z - minZ) / 5.0, 0.0, 1.0);
    
    // Edge fading to prevent popping during wrap
    float fadeX = smoothstep(maxOffset.x, maxOffset.x * 0.85, abs(displacement.x));
    float fadeY = smoothstep(maxOffset.y, maxOffset.y * 0.85, abs(displacement.y));
    vAlpha = visibility * fadeX * fadeY;

    vec4 modelPosition = modelMatrix * instanceMatrix * vec4(newPosition, 1.0);        
    gl_Position = projectionMatrix * viewMatrix * modelPosition;    

    vUv = uv;
    vTextureCoords = aTextureCoords;
    vImageAspect = aImageAspect;
}
`;

export const fragmentShader = `
precision mediump float;
varying vec2 vUv;
varying float vAlpha;
varying vec4 vTextureCoords;
varying float vImageAspect;

uniform sampler2D uWrapperTexture;
uniform sampler2D uAtlas;

void main()
{            
    // Optimized frame UV mapping
    vec2 frameUV = vUv * vec2(0.5414, 0.7665) + vec2(0.2289, 0.116);
    vec4 texel = texture2D(uWrapperTexture, frameUV);

    // Inner hole check (optimized bounds)
    bool isInsideHole = all(greaterThanEqual(vUv, vec2(0.09, 0.11))) && all(lessThanEqual(vUv, vec2(0.91, 0.89)));

    if (texel.a < 0.01 && !isInsideHole) {
        discard;
    }

    // Remap vUv for hole (0.10-0.90 -> 0.0-1.0, 0.1265-0.8728 -> 0.0-1.0)
    vec2 photoUV = clamp((vUv - vec2(0.10, 0.1265)) / vec2(0.80, 0.7463), 0.0, 1.0);

    float holeAspect = 1.388;
    float aspectDiff = vImageAspect / holeAspect;
    
    vec2 coverUV = photoUV;
    if (aspectDiff > 1.0) {
        float scale = 1.0 / aspectDiff;
        coverUV.x = (1.0 - scale) * 0.5 + photoUV.x * scale;
    } else {
        coverUV.y = (1.0 - aspectDiff) * 0.5 + photoUV.y * aspectDiff;
    }

    // Atlas lookup
    vec2 atlasUV = mix(vTextureCoords.xz, vTextureCoords.yw, vec2(coverUV.x, 1.0 - coverUV.y));
    vec4 photoTexel = texture2D(uAtlas, atlasUV);

    // Composite and apply visibility/clamping
    vec4 color = mix(photoTexel, texel, texel.a);
    color.a *= vAlpha;
    
    gl_FragColor = min(color, 1.0);
}
`;
