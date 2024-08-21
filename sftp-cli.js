import { select, password } from "@inquirer/prompts";
import SftpClient from "ssh2-sftp-client";

async function SftpConnection() {
  try {
    // hostname
    const hostname = await select({
      message: "Select a hostname:",
      choices: [
        { value: "host1.citco.com", title: "host1.citco.com" },
        { value: "host2.citco.com", title: "host2.citco.com" },
        { value: "host3.citco.com", title: "host3.citco.com" },
      ],
    });

    // username
    const username = await select({
      message: "Select a username:",
      choices: [
        { value: "user1", title: "user1" },
        { value: "user2", title: "user2" },
        { value: "user3", title: "user3" },
      ],
    });

    // password
    const userPassword = await password({
      message: `Enter password for ${username}@${hostname}:`,
      mask: true,
    });

    // Connect to the SFTP server
    const sftp = new SftpClient();
    await sftp.connect({
      host: hostname,
      username: username,
      password: userPassword,
    });

    console.log(`Connected to ${hostname} as ${username}.`);

    // Change directory and list files
    const remoteDir = "/path/to/your/directory";
    await sftp.cd(remoteDir);
    const fileList = await sftp.list(remoteDir);
    console.log(`Files in ${remoteDir}:`);
    fileList.forEach((file) => console.log(file.name));

    //Close the SFTP connection
    await sftp.end();
    console.log("SFTP connection closed.");
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

SftpConnection();
