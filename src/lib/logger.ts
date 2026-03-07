type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
    [key: string]: unknown;
}

class Logger {
    private formatMessage(level: LogLevel, message: string, context?: LogContext) {
        const timestamp = new Date().toISOString();
        return JSON.stringify({
            timestamp,
            level,
            message,
            ...context,
        });
    }

    info(message: string, context?: LogContext) {
        console.info(this.formatMessage('info', message, context));
    }

    warn(message: string, context?: LogContext) {
        console.warn(this.formatMessage('warn', message, context));
    }

    error(message: string, context?: LogContext, error?: Error) {
        const errorContext = error ? { 
            errorName: error.name, 
            errorMessage: error.message, 
            errorStack: error.stack 
        } : {};
        console.error(this.formatMessage('error', message, { ...context, ...errorContext }));
    }

    debug(message: string, context?: LogContext) {
        if (process.env.NODE_ENV !== 'production') {
            console.debug(this.formatMessage('debug', message, context));
        }
    }
}

export const logger = new Logger();
