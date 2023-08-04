import { Bot, InputFile, Keyboard } from "grammy";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import qrcode from "qrcode";
import  ig  from "instagram-url-dl";
const labels = ["QrCode Yasash 📠", "instagram", "tiktok"];

const buttonRows = labels.map((label) => [Keyboard.text(label)]);
const keyboard = Keyboard.from(buttonRows).resized();

var state = 0;
async function botFunc() {
  const bot = new Bot(process.env["BOT_TOKEN"]);
  bot.command("start", (ctx) => {
    state = 0;
    ctx.reply(`${ctx.msg.from.first_name}${" "}Assalomu aleykum`, {
      reply_markup: keyboard,
    });
  });
  bot.hears("QrCode Yasash 📠", (ctx) => {
    state = 1;
    ctx.reply("Marhamat menga matn jo'nating!");
  });
  bot.hears("instagram", async (ctx) => {
    state = 2;
    ctx.reply("Marhamat menga instagram link jo'nating!");
  });
  bot.hears("tiktok", async (ctx) => {
    state = 3;
    ctx.reply("Marhamat menga tiktok link jo'nating!");
  });
  bot.on("message:text", async (ctx) => {
    if (state == 1) {
      let msg = ctx.msg.text;
      let path1 = path.join(process.cwd(), "uploads", `${uuidv4()}.jpg`);

      function createQr() {
        return new Promise((resolve, reject) => {
          qrcode.toFile(
            path1,
            msg,
            {
              color: {
                dark: "#00F",
                light: "#0000",
              },
            },
            function (err) {
              if (err) reject(err);
              return resolve(path1);
            }
          );
        });
      }
      await ctx.replyWithPhoto(new InputFile(createQr), {
        reply_to_message_id: ctx.msg.message_id,
      });
    } else if (state == 2) {
      let link = ctx.msg.text;
      ig(link)
        .then((res) => {
          ctx.replyWithVideo(res.data[0].url, {
            reply_to_message_id: ctx.msg.message_id,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (state == 3) {
      //output { id : "string" }
    }
    // ctx.replyWithPhoto(new InputFile(qr));
  });
  console.log(state);

  bot.start();
}
botFunc();
