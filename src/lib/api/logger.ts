type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogStyles {
    request: string;
    response: string;
    error: string;
    info: string;
    debug: string;
}

const LOG_STYLES: LogStyles = {
    request: 'color: #4CAF50; font-weight: bold;',
    response: 'color: #2196F3; font-weight: bold;',
    error: 'color: #f44336; font-weight: bold;', 
    info: 'color: #9C27B0; font-weight: bold;', 
    debug: 'color: #FF9800; font-weight: bold;',
};

class ApiLogger {
    private enabled: boolean;
    private logLevel: LogLevel[];

    constructor() {
        this.enabled = import.meta.env.MODE === 'development';
        this.logLevel = ['info', 'warn', 'error', 'debug'];
    }

    public request(method: string, url: string, data?: Record<string, unknown>) {
        if (!this.enabled || !this.shouldLog('debug')) return;

        console.groupCollapsed(
            `%c→ ${method.toUpperCase()} Request: ${url}`,
            LOG_STYLES.request
        );
        console.log('URL:', url);
        console.log('Method:', method);
        if (data) {
            console.log('Payload:', data);
        }
        console.groupEnd();
    }

    public response(method: string, url: string, response: { status: number; data: unknown }) {
        if (!this.enabled || !this.shouldLog('debug')) return;

        console.groupCollapsed(
            `%c← ${method.toUpperCase()} Response: ${url}`,
            LOG_STYLES.response
        );
        console.log('URL:', url);
        console.log('Method:', method);
        console.log('Status:', response.status);
        console.log('Data:', response.data);
        console.groupEnd();
    }

    public error(method: string, url: string, error: { response?: { status: number; data: unknown }; message: string; stack?: string }) {
        if (!this.enabled || !this.shouldLog('error')) return;

        console.groupCollapsed(
            `%c✕ ${method.toUpperCase()} Error: ${url}`,
            LOG_STYLES.error
        );
        console.log('URL:', url);
        console.log('Method:', method);

        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
        }

        console.log('Error:', error);
        console.trace('Stack trace:');
        console.groupEnd();
    }

    public info(message: string, data?: unknown) {
        if (!this.enabled || !this.shouldLog('info')) return;

        console.groupCollapsed(`%cℹ Info: ${message}`, LOG_STYLES.info);
        if (data) {
            console.log('Data:', data);
        }
        console.groupEnd();
    }

    public debug(message: string, data?: unknown) {
        if (!this.enabled || !this.shouldLog('debug')) return;

        console.groupCollapsed(`%c⚙ Debug: ${message}`, LOG_STYLES.debug);
        if (data) {
            console.log('Data:', data);
        }
        console.groupEnd();
    }

    private shouldLog(level: LogLevel): boolean {
        return this.logLevel.includes(level);
    }

    public setLogLevel(levels: LogLevel[]) {
        this.logLevel = levels;
    }

    public enable() {
        this.enabled = true;
    }

    public disable() {
        this.enabled = false;
    }
}

export const apiLogger = new ApiLogger();