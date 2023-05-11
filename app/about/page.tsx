import Link from "next/link";
import Image from "next/image";

import me from "@/public/me.jpeg";

export default function About() {
  return (
    <>
      <Image
        src={me}
        alt="A washed out polaroid picture of me smiling."
        className="max-w-[300px] mx-auto"
      />
      <p>
        Hello, I’m Christopher Henn, a programmer. When I’m not attempting to
        befriend a computer, I can usually be found running. Find me elsewhere
        in cyberspace on <Link href="https://github.com/chnn">GitHub</Link> or{" "}
        <Link href="https://www.strava.com/athletes/163049">Strava</Link>.
      </p>
      <p></p>
    </>
  );
}
