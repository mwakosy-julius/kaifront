import { Page } from "@/components/core/page";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const navigate = useNavigate();

  return (
    <Page
      container
      overflowHidden
    >
      <div className="flex container items-center justify-between py-5">
        <div>
          <img src="/kaidoku-logo.svg" alt="Logo" className="w-1/2" />
        </div>
        <div>
          <Button
            variant={"ghost"}
            size={"lg"}
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </Button>

          <Button
            variant={"default"}
            className="ml-4"
            size={"lg"}
            onClick={() => navigate("/register")}
          >
            Get Started
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default LandingPage;
