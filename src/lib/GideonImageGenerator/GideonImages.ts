import { GideonClient } from "../..";
import { Canvas } from "canvas-constructor";
import { readFile } from "fs-nextra";

export class PingImage {
  private client: GideonClient;
  protected image: Buffer;
  constructor(client:GideonClient) {
    this.client = client;
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