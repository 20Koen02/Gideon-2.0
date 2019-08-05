import { applyOptions } from "@lib/Util/Util"
import { CommandOptions, Command, KlasaMessage } from "klasa";
import fetch from "node-fetch"
import { MessageAttachment } from "discord.js";
import { WeatherImage } from "@lib/GideonImageGenerator/GideonImages";

@applyOptions<CommandOptions>({
  cooldown: 5,
  usage: "<city:...string>",
  desc: (i18n) => i18n.get("desc_weather"),
})

export default class WeatherCommand extends Command {



  async run(message: KlasaMessage, [city]: [string]) {
    const dist_measure = "kmph";
    const temp_measure = "c";
 
    try {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?appid=${this.client.config.OpenWeatherMap}&q=${city}&units=metric`
      ).then((r) => r.json());
      const result = await new WeatherImage(message).getImage(res, dist_measure, temp_measure);
      return message.send(new MessageAttachment(result, "weather.png"));
    } catch (e) {
      console.error(e);
      return message.send(message.i18n.get("cmd_weather_valid"));
    }
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
