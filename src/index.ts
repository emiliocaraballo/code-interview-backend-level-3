import { startServer } from "src/server"
import { AppDataSource } from "src/config/typeorm.config";

(async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database initialized!');
        await startServer();
        console.log('Server started!');
    } catch (err) {
        console.error('Error during startup:', err);
        process.exit(1);
    }
})();