import cron from "node-cron";
import fs from "fs";
import path from "path";


export const setupCleanupJob = (tempDir: string) => {
  cron.schedule("0 */10 * * *", () => {
    const now = Date.now();
    const expirationTime = 1 * 60 * 60 * 1000; 

    fs.readdir(tempDir, (err, files) => {
      if (err) {
        console.error("Error reading temp directory:", err);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join(tempDir, file);
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error("Error getting file stats:", err);
            return;
          }

          if (now - stats.mtimeMs > expirationTime) {
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log(`Deleted old temp file: ${filePath}`);
              }
            });
          }
        });
      });
    });
  });

  console.log("Cron job set up to delete old temp files every 1 hours.");
};
