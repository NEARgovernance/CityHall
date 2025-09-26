import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Github,
  MessageCircle,
  LayoutList,
  Contact,
  UserPlus,
  Lightbulb,
  Handshake,
  Vote,
  BarChart3,
  IdCard,
  Star,
  CheckSquare,
} from "lucide-react";
import { Join } from "@/components/join";
import { useTheme } from "@/components/theme-provider";

export const Route = createFileRoute("/_layout/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const logoSrc = currentTheme === "light" ? "/nch-dark.png" : "/nch-light.png";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-24">
        <div className="text-center space-y-6 sm:space-y-8">
          <div className="flex justify-center mb-8">
            <img
              src={logoSrc}
              alt="NEAR Logo"
              className="h-24 w-24 sm:h-32 sm:w-32"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            Near City Hall
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto font-light">
            Community Governance Building
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Join />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Evolving Coordination Systems
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Vote className="h-8 w-8" />}
              title="Democratic Values"
              description="Every member has equal voting power, which levels the playing field, so all voices can be heard."
            />
            <FeatureCard
              icon={<Lightbulb className="h-8 w-8" />}
              title="Citizen Assemblies"
              description="Submit proposals and conduct polls to gather community feedback for alignment on important decisions."
            />
            <FeatureCard
              icon={<Handshake className="h-8 w-8" />}
              title="Open Collaboration"
              description="Get involved by supporting our Community Working Group, and build reputation as a potential council member."
            />
          </div>
        </div>
      </section>

      {/* Take Action Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Take Action</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover ways to contribute:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard
              icon={<Contact className="h-6 w-6" />}
              title="View Members"
              description="Learn about community leaders."
            />
            <ActionCard
              icon={<LayoutList className="h-6 w-6" />}
              title="Discuss Proposals"
              description="Engage via the governance forum."
            />
            <ActionCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Launch Polls"
              description="Ask questions to gauge opinions."
            />
            <ActionCard
              icon={<UserPlus className="h-6 w-6" />}
              title="Build Connections"
              description="Follow people using Near Social."
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Join?</h2>
            <p className="text-lg text-muted-foreground">
              Membership benefits and opportunities include:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <BenefitCard
              icon={<CheckSquare className="h-8 w-8" />}
              title="Voting Rights"
              description="Participate in decision making."
            />
            <BenefitCard
              icon={<IdCard className="h-8 w-8" />}
              title="Profile Badge"
              description="Display verifiable credentials."
            />
            <BenefitCard
              icon={<Star className="h-8 w-8" />}
              title="Opportunities"
              description="Advance to leadership roles."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Get Involved Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us to shape the future of NEAR governance!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="flex items-center gap-2"
            >
              <a
                href="https://t.me/+T-cXO_3J8Ek0MWUx"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Telegram
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="flex items-center gap-2"
            >
              <a
                href="https://github.com/NEARgovernance/CityHall"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-background p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-background p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-primary">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-6">
      <div className="text-primary mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
