import { Canvas } from "canvas-constructor";
import { readFile } from "fs-nextra";
import { Weather } from "@src/commands/General/weather";
import { KlasaMessage } from "klasa";
import { Client } from "discord.js";

export class PingImage {
  private client: Client;
  private message: KlasaMessage;
  protected image: Buffer;
  constructor(message:KlasaMessage) {
    this.client = message.client;
    this.message = message;
  }
  async getImage(ping:number) {
    let clock = await readFile("./assets/ping/clock.png");
    let floppy = await readFile("./assets/ping/floppy.png");
    this.image = new Canvas(200, 70)
    .setColor("#2F3136")
    .addRect(0, 0, 200, 70)
    .setColor("#242528")
    .save()
    .createBeveledClip(10, 10, 85, 50, 15)
    .addRect(10, 10, 85, 50)
    .restore()
    .save()
    .createBeveledClip(105, 10, 85, 50, 15)
    .addRect(105, 10, 85, 50)
    .restore()
    .addImage(clock, 20, 25, 20, 20)
    .addImage(floppy, 115, 25, 20, 20)
    .setColor("#ffffff")
    .setTextFont("15px Ubuntu")
    .addText(`${ping}`, 50, 33)
    .addText(`ms`, 50, 48)
    .addText(`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0)}`, 145, 33)
    .addText(`mb`, 145, 48)
    .toBuffer();
    return this.image;
  }
}

export class DiceImage {
  private client: Client;
  private message: KlasaMessage;
  protected image: Buffer;
  constructor(message:KlasaMessage) {
    this.client = message.client;
    this.message = message;
  }
  async getImage(rng:number) {
    const side = await readFile(`./assets/dice/${rng}.png`);

    this.image = new Canvas(110, 70)
      .setColor("#2F3136")
      .addRect(0, 0, 110, 70)
      .save()
      .createBeveledClip(50, 20, 50, 30, 10)
      .setColor("#4b4e54")
      .addRect(50, 20, 50, 30)
      .restore()
      .setColor("#242528")
      .save()
      .createBeveledClip(10, 10, 50, 50, 20)
      .addRect(10, 10, 50, 50)
      .restore()
      .addImage(side, 10, 10, 50, 50)
      .setColor("#ffffff")
      .setTextFont("25px Ubuntu")
      .addText(`${rng}`, 70, 43)
      .toBuffer();
    return this.image;
  }
}

export class WeatherImage {
  private client: Client;
  private message: KlasaMessage;
  protected image: Buffer;
  constructor(message:KlasaMessage) {
    this.client = message.client;
    this.message = message;
  }

  async getImage(data:Weather, dist:string, temp:string) {
    let winddir = await readFile("./assets/weather/winddirection.png")
    let image
    if (data.weather[0].icon == "01d") {
      image = await readFile("./assets/weather/sun.png")
    } else if (data.weather[0].icon == "01n") {
      image = await readFile("./assets/weather/moon.png")
    } else if (data.weather[0].icon == "02d") {
      image = await readFile("./assets/weather/fewcloudsday.png")
    } else if (data.weather[0].icon == "02n") {
      image = await readFile("./assets/weather/fewcloudsnight.png")
    } else if (data.weather[0].icon == "03d" || data.weather[0].icon == "03n" || data.weather[0].icon == "04d" || data.weather[0].icon == "04n") {
      image = await readFile("./assets/weather/clouds.png")
    } else if (data.weather[0].icon == "09d" || data.weather[0].icon == "09n" || data.weather[0].icon == "10d" || data.weather[0].icon == "10n") {
      image = await readFile("./assets/weather/rain.png")
    } else if (data.weather[0].icon == "11d" || data.weather[0].icon == "11n") {
      image = await readFile("./assets/weather/thunderstorm.png")
    } else if (data.weather[0].icon == "13d" || data.weather[0].icon == "13n") {
      image = await readFile("./assets/weather/snow.png")
    } else if (data.weather[0].icon == "50d" || data.weather[0].icon == "50n") {
      image = await readFile("./assets/weather/mist.png")
    }
    
    let tempText = "";
    let windText = "";
    if(temp == "c") {
      tempText = `${this.message.i18n.get("cmd_weather_temperature")}: ${Math.round(data.main.temp)} °C (${Math.round(data.main.temp_min)} - ${Math.round(data.main.temp_max)})`
    } else {
      tempText = `${this.message.i18n.get("cmd_weather_temperature")}: ${Math.round((9 * data.main.temp + (32 * 5)) / 5)} °F (${Math.round(( 9 * data.main.temp_min + (32 * 5)) / 5)} - ${Math.round((9 * data.main.temp_max + (32 * 5)) / 5)})`
    }


    
    if (dist == "kmph") {
      windText = `${this.message.i18n.get("cmd_weather_wind")}: ${Math.round(data.wind.speed * 3.6)} km/h`
    } else {
      windText = `${this.message.i18n.get("cmd_weather_wind")}: ${Math.round((data.wind.speed * 3.6)/1.609344)} mi/h`
    }
    
    
    
    const canvas = new Canvas(600, 300)
      .setColor("#2F3136")
      .addRect(0, 0, 600, 500)
      .setColor("#242528")
      .addRect(0, 0, 600, 70)
      .save()
      .createBeveledClip(440, 90, 140, 140, 15)
      .setColor("#242528")
      .addRect(440, 90, 140, 140)
      .restore()
      .save()
      .createBeveledClip(20, 90, 400, 190, 15)
      .setColor("#242528")
      .addRect(20, 90, 400, 190)
      .restore()
      .setColor("#ffffff")
      .setTextFont("37px Ubuntu")
      .addText(`${data.name}, ${data.sys.country}`, 25, 50)
      .addImage(image, 450, 100, 120, 120)
      .setTextFont("23px Ubuntu")
      .addText(`Condition: ${data.weather[0].main}`, 45, 135)
      .addText(tempText, 45, 165)
      .addText(`Humidity: ${data.main.humidity}%`, 45, 195)
      .addText(windText, 45, 225)
    if(data.wind.deg) canvas.addText(`Wind Direction: ${Math.round(data.wind.deg)}°`, 45, 255)
    if(data.wind.deg) canvas.save()
    if(data.wind.deg) canvas.translate(290, 247)
    if(data.wind.deg) canvas.rotate((data.wind.deg * Math.PI) / 180)
    if(data.wind.deg) canvas.translate(-15, -15)
    if(data.wind.deg) canvas.addImage(winddir, 0, 0, 30, 30)
    if(data.wind.deg) canvas.restore();
    this.image = canvas.toBuffer();  
    return this.image;
  }
}