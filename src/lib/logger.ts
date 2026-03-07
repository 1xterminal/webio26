type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
    [key: string]: any;
}

class Logger {
    private isProd = process.env.NODE_ENV === 'production';

    private formatMessage(level: LogLevel, message: string, context?: LogContext) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level: level.toUpperCase(),
            message,
            ...context,
        };

        return this.isProd ? JSON.stringify(logEntry) : logEntry;
    }

    public info(message: string, context?: LogContext) {
        const formatted = this.formatMessage('info', message, context);
        if (this.isProd) {
            console.info(formatted);
        } else {
            console.info(`[INFO] ${message}`, context || '');
        }
    }

    public warn(message: string, context?: LogContext) {
        const formatted = this.formatMessage('warn', message, context);
        if (this.isProd) {
            console.warn(formatted);
        } else {
            console.warn(`[WARN] ${message}`, context || '');
        }
    }

    public error(message: string, context?: LogContext) {
        const formatted = this.formatMessage('error', message, context);
        if (this.isProd) {
            console.error(formatted);
        } else {
            console.error(`[ERROR] ${message}`, context || '');
        }
    }

    public debug(message: string, context?: LogContext) {
        if (this.isProd) return;
        console.debug(`[DEBUG] ${message}`, context || '');
    }
}

export const logger = new Logger();
