import { ProseLayout } from "@/app/ProseLayout";
import Link from "next/link";

export default function WeatherPage() {
  return (
    <div className="prose mx-auto p-4 lg:p-8">
      <ul>
        <li>
          <Link href="/weather/40.7218,-73.9511">Greenpoint</Link>
        </li>
      </ul>
    </div>
  );
}
