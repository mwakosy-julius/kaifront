import { Page } from "@/components/core/page";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <Page container>
      <div className="container flex items-center justify-between py-5">
        <div>
          <img src="/kaidoku-logo.svg" alt="Logo" className="w-1/2" />
        </div>
        <div>
          <Button variant="ghost" size="lg" href="/sign-in">
            Sign In
          </Button>

          <Button
            variant={"default"}
            className="ml-4"
            size={"lg"}
            href="/sign-up"
          >
            Get Started
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="mb-4 text-4xl font-bold">The Beautiful Landing Page</h1>
      </div>
    </Page>
  );
};

export default LandingPage;
