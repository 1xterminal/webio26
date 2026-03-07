export const vertexShader = `
varying vec2 vUv;

attribute vec3 aInitialPosition;
attribute float aMeshSpeed;
attribute vec4 aTextureCoords;
attribute float aImageAspect;

uniform float uTime;
uniform vec2 uMaxXdisplacement;
uniform vec2 uDrag;

uniform float uSpeedY;
uniform float uScrollY;

varying float vVisibility;
varying vec4 vTextureCoords;
varying float vImageAspect;

//linear smoothstep
float remap(float value, float originMin, float originMax)
{
    return clamp((value - originMin) / (originMax - originMin),0.,1.);
}

void main()
{     
    vec3 newPosition=position + aInitialPosition;

    float maxX = uMaxXdisplacement.x;
    float maxY = uMaxXdisplacement.y;

    float maxYoffset = distance(aInitialPosition.y,maxY);
    float minYoffset = distance(aInitialPosition.y,-maxY);

    float maxXoffset = distance(aInitialPosition.x,maxX);
    float minXoffset = distance(aInitialPosition.x,-maxX);
    
    float xDisplacement = mod(minXoffset -uDrag.x + uTime * aMeshSpeed, maxXoffset+minXoffset) - minXoffset;
    float yDisplacement = mod(minYoffset -uDrag.y, maxYoffset+minYoffset) - minYoffset;

    float maxZ = 12.;
    float minZ = -30.;
    
    float maxZoffset = distance(aInitialPosition.z,maxZ);    
    float minZoffset = distance(aInitialPosition.z,minZ);    
    
    float zDisplacement = mod(uScrollY + minZoffset,maxZoffset + minZoffset ) - minZoffset;    
    
    newPosition.x += xDisplacement; 
    newPosition.y += yDisplacement;
    newPosition.z += zDisplacement;

    vVisibility = remap(newPosition.z, minZ, minZ+5.);

    vec4 modelPosition = modelMatrix * instanceMatrix * vec4(newPosition, 1.0);        

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;    

    vUv = uv;
    vTextureCoords = aTextureCoords;
    vImageAspect = aImageAspect;
}
`;

export const fragmentShader = `
varying vec2 vUv;
varying float vVisibility;
varying vec4 vTextureCoords;
varying float vImageAspect;

uniform sampler2D uWrapperTexture;
uniform sampler2D uAtlas;
uniform sampler2D uBlurryAtlas;

void main()
{            
    // Crop the unused transparent padding from photo_frame.png
    // Original image: 1280x698. Bounding box: X(293 to 986), Y(82 to 617)
    // In loaded texture (Y-flipped), V bounds are 0.116 to 0.8825
    float frameU = mix(0.2289, 0.7703, vUv.x);
    float frameV = mix(0.116, 0.8825, vUv.y);
    vec2 frameUV = vec2(frameU, frameV);

    vec4 texel = texture2D(uWrapperTexture, frameUV);

    // Inner hole in vUv coordinates
    bool isInsideHole = vUv.x >= 0.09 && vUv.x <= 0.91 && vUv.y >= 0.11 && vUv.y <= 0.89;

    // Discard completely transparent pixels outside the frame (e.g. rounded corners)
    if (texel.a < 0.01 && !isInsideHole) {
        discard;
    }

    // Get UV coordinates for this image from the uniform array
    float xStart = vTextureCoords.x;
    float xEnd = vTextureCoords.y;
    float yStart = vTextureCoords.z;
    float yEnd = vTextureCoords.w;

    // Remap vUv so the photo fits the hole area
    // Hole bounds: X 0.10–0.90, Y 0.1265–0.8728
    float photoU = clamp((vUv.x - 0.10) / 0.80, 0.0, 1.0);
    float photoV = clamp((vUv.y - 0.1265) / 0.7463, 0.0, 1.0);

    // --- Object-fit: cover ---
    // Hole aspect ratio: geometry is 1.295:1, hole spans 80% of X and 74.63% of Y
    // So hole aspect = 1.295 * (0.80 / 0.7463) ≈ 1.388
    float holeAspect = 1.388;
    float imageAspect = vImageAspect;

    // coverU/coverV: adjusted coordinates that center-crop the image
    float coverU = photoU;
    float coverV = photoV;

    if (imageAspect > holeAspect) {
        // Image is wider than hole: crop sides, full height
        float scale = holeAspect / imageAspect;
        float offset = (1.0 - scale) * 0.5;
        coverU = offset + photoU * scale;
    } else {
        // Image is taller than hole: crop top/bottom, full width
        float scale = imageAspect / holeAspect;
        float offset = (1.0 - scale) * 0.5;
        coverV = offset + photoV * scale;
    }

    // Flip V for atlas (yStart > yEnd in atlas coords)
    coverV = 1.0 - coverV;

    vec2 atlasUV = vec2(
        mix(xStart, xEnd, coverU),
        mix(yStart, yEnd, coverV)
    );     

    vec4 photoTexel = texture2D(uAtlas, atlasUV);

    // Draw the structural frame over the photo
    // If the frame is transparent (hole), it shows the photo completely.
    vec4 color = mix(photoTexel, texel, texel.a);

    color.a *= vVisibility;

    color.r = min(color.r, 1.);
    color.g = min(color.g, 1.);
    color.b = min(color.b, 1.);

    gl_FragColor = color;
}
`;
