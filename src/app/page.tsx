import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { DemoSection } from "@/components/sections/DemoSection";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/ui/Reveal";
import { LocaleProvider } from "@/components/ui/LocaleProvider";
import { ScrollTop } from "@/components/ui/ScrollTop";
export default function Home() { return <LocaleProvider><Header/><main><Reveal><Hero/></Reveal><Reveal><Services/></Reveal><Reveal><DemoSection/></Reveal><Reveal><Process/></Reveal><Reveal><Pricing/></Reveal><Reveal><FAQ/></Reveal><Reveal><Contact/></Reveal></main><Footer/><ScrollTop/></LocaleProvider>; }
