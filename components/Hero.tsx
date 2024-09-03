"use client";
import React from "react";
import Navbar from "./Navbar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";

type Props = {};

const Hero = (props: Props) => {
  return (
    <main className="min-h-screen w-full bg-green-500 ">
      <Navbar />
      <section className=" flex justify-center items-center py-11 ">
        <div>
          <h1
            className=" font-extrabold text-[#d2e823] text-left"
            style={{
              fontSize: "clamp(32px, 8.5vmin, 88px)",
            }}
          >
            Everything you are. In one, simple link in bio.
          </h1>
          <p
            className=" font-normal leading-normal text-[#d2e823] "
            style={{
              fontSize: "font-size: clamp(16px, 2vmin, 20px)",
            }}
          >
            Join 50M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>
          <div className=" flex gap-x-2 w-96">
            <Input type="text" placeholder="Username" className=" bg-white" />
            <Button>Get Started</Button>
          </div>
        </div>
        <div></div>
      </section>
    </main>
  );
};

export default Hero;
