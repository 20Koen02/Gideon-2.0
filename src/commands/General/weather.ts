import { applyOptions } from "../../lib/Util/Util"
import { CommandOptions, Command } from "klasa"
import { Canvas } from "canvas-constructor"
import { KlasaMessage } from "klasa"
import { readFile } from "fs-nextra"
import fetch from "node-fetch"
import { MessageAttachment } from "discord.js";

@applyOptions<CommandOptions>({
  cooldown: 5,
  usage: "<city:...string>",
  description: "Shows the weather for the given city"
})

export default class WeatherCommand extends Command {
  async run(message: KlasaMessage, [city]: [string]) {
    const geturl = `http://api.openweathermap.org/data/2.5/weather`
    try {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?appid=${this.client.config.OpenWeatherMap}&q=${city}&units=metric`
      ).then((r) => r.json());
      const result = await this.weather(res);
      return message.send(new MessageAttachment(result, "weather.png"));
    } catch (e) {
      console.error(e);
      return message.send(message.i18n.get("cmd_weather_valid"));
    }
  }

  async weather(data: Weather) {
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
    } else if (
      data.weather[0].icon == "03d" ||
      data.weather[0].icon == "03n" ||
      data.weather[0].icon == "04d" ||
      data.weather[0].icon == "04n"
    ) {
      image = await readFile("./assets/weather/clouds.png")
    } else if (
      data.weather[0].icon == "09d" ||
      data.weather[0].icon == "09n" ||
      data.weather[0].icon == "10d" ||
      data.weather[0].icon == "10n"
    ) {
      image = await readFile("./assets/weather/rain.png")
    } else if (data.weather[0].icon == "11d" || data.weather[0].icon == "11n") {
      image = await readFile("./assets/weather/thunderstorm.png")
    } else if (data.weather[0].icon == "13d" || data.weather[0].icon == "13n") {
      image = await readFile("./assets/weather/snow.png")
    } else if (data.weather[0].icon == "50d" || data.weather[0].icon == "50n") {
      image = await readFile("./assets/weather/mist.png")
    }

    const canvas =  new Canvas(600, 300)
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
      .addText(
        `Temperature: ${Math.round(data.main.temp)} °C (${
          data.main.temp_min
        } - ${data.main.temp_max})`,
        45,
        165
      )
      .addText(`Humidity: ${data.main.humidity}%`, 45, 195)
      .addText(`Wind: ${Math.round(data.wind.speed * 3.6)} km/h`, 45, 225)
      if(data.wind.deg) canvas.addText(`Wind Direction: ${Math.round(data.wind.deg)}°`, 45, 255)
      if(data.wind.deg) canvas.save()
      if(data.wind.deg) canvas.translate(290, 247)
      if(data.wind.deg) canvas.rotate((data.wind.deg * Math.PI) / 180)
      if(data.wind.deg) canvas.translate(-15, -15)
      if(data.wind.deg) canvas.addImage(winddir, 0, 0, 30, 30)
      if(data.wind.deg) canvas.restore();
      return canvas.toBuffer();
  }
}

export interface Weather {
  coord?: {
    lon?: number
    lat?: number
  }
  weather?: {
    id?: number
    main?: string
    description?: string
    icon?: "01d" | "01n" | "02d" | "02n" | "03d" | "03n" | "04d" | "04n" | "09d" | "09n" | "10d" | "10n" | "11d" | "11n" | "13d" | "13n" | "50d" | "50n"
  }[]
  base?: string
  main?: {
    temp?: number
    pressure?: number
    humidity?: number
    temp_min?: number
    temp_max?: number
  }
  visibility?: number
  wind?: {
    speed?: number
    deg?: number
  }
  clouds?: {
    all?: number
  }
  dt?: number
  sys?: {
    type?: number
    id?: number
    message?: number
    country?: string
    sunrise?: number
    sunset?: number
  }
  timezone?: number
  id?: number
  name?: string
  cod?: number
}
