<div align="center">

![Banner]

![CodeFactor]
![Discord.js]
![Discord Player]

singscribe is a work-in-progress [**Discord**](https://discord.com/) music bot built upon [**TypeScript**](https://www.typescriptlang.org/), the [**Discord.js**](https://discord.js.org/#/) API, and the [**discord-player**](https://discord-player.js.org/) framework.

</div>

---

## 🛠️ Installation

1. Clone the repository and `cd` into it:

    ```sh
    git clone https://github.com/jktrn/singscribe.git
    cd singscribe
    ```

2. Install required `npm` dependencies:

    ```sh
    npm install
    ```

3. After installing the dependencies, you can run the bot with:

    ```sh
    npm run dev
    ```

> **Note**: The `dev` script will run the bot with [nodemon](https://nodemon.io/), which will automatically restart the bot when changes are made to the source code.


## ⚙️ Configuration

The bot requires a Discord bot token to use the Discord API. [Follow this guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) to create a bot application within Discord's developer portal to get a token.

> **Warning**: **Never, ever, *ever* share/commit your bot token** (or any API key in general)! Malicious users can use it to gain privileged access to your bot and any servers it is in. If you accidentally commit your token, [revoke it immediately](https://discordjs.guide/preparations/setting-up-a-bot-application.html#revoking-token-and-invite-link) and generate a new one.

After you've acquired your token, copy the `.example.env` file, which contains such:

```env
TOKEN="token"
TEST_GUILD="123456789"
```

Name this new file `.env`, and replace the `TOKEN` value with your own. For test guild deployments, change the `TEST_GUILD` value to your testing server's ID (right-click on the server icon and select "Copy ID").

### 🚀 Deployment

To deploy slash commands to your test guild, run the following command:

```sh
npm run deploy
```

This will run the `deploy` script specified in `package.json` (`cross-env IS_SCRIPT=true ts-node src/scripts/deploy`), which will deploy the bot's slash commands to your test guild whenever commands are added or removed. **You do not need to run this script when you make changes to existing commands.**

To deploy functions to production (which includes all servers your bot is in), run the following command:

```sh
npm run deploy-prod
```

> **Note**: Discord production deploys take upwards of an hour to take effect. Ensure your command properly functions before running this script.

---

## ⚡ Commands

Here are tables of commands that singscribe currently supports:

### Music

| Command    | Options                                     | Description                                                                 |
| ---------- | ------------------------------------------- | --------------------------------------------------------------------------- |
| `/info`    | none                                        | Displays info about the currently playing song.                             |
| `/pause`   | none                                        | Pauses the current song.                                                    |
| `/play`    | `query`: Search query or URL.               | Plays a song or playlist from YouTube, SoundCloud, Spotify, or Apple Music. |
| `/queue`   | `pagenumber`: Page number to display.       | Displays the current song queue (paginated).                                |
| `/quit` **[BROKEN]** | none                              | Leaves the current voice channel and clear the queue.                       |
| `/resume`  | none                                        | Resumes the current song, if paused.                                        |
| `/shuffle` | none                                        | Shuffles the current queue.                                                 |
| `/skip`    | none                                        | Skips the current song.                                                     |
| `/skipto`  | `tracknumber`: Track number to skip to.     | Skips to a specific track number in the queue.                              |

### General

| Command    | Options                                     | Description                                                                 |
| ---------- | ------------------------------------------- | --------------------------------------------------------------------------- |
| `/help`    | none                                        | Displays a list of supported commands.                                      |
| `/ping`    | none                                        | Test the bot's online status.                                               |
| `/connect` | none                                        | Connects the bot to the voice channel you are currently in.                 |
| `/disconnect` **[BROKEN]** | none                        | Disconnects the bot from the voice channel it is currently in.              |

--- 

## 📝 License

All code in this repository is licensed under the [GNU Affero General Public License v3](https://www.gnu.org/licenses/agpl-3.0.en.html). See the [LICENSE](LICENSE) file for more information.

[Banner]: /src/config/banner.svg
[CodeFactor]: https://img.shields.io/codefactor/grade/github/jktrn/singscribe?color=294978&style=for-the-badge&logo=codefactor&logoColor=fff
[Discord.js]: https://img.shields.io/github/package-json/dependency-version/jktrn/singscribe/discord.js?color=3e5b86&style=for-the-badge&logo=discord&logoColor=fff
[Discord Player]: https://img.shields.io/github/package-json/dependency-version/jktrn/singscribe/discord-player?color=546d93&style=for-the-badge&logo=npm&logoColor=white