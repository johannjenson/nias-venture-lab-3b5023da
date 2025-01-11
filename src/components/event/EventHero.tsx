import { Button } from "@/components/ui/button";

interface EventHeroProps {
  onRequestInvite: () => void;
}

const EventHero = ({ onRequestInvite }: EventHeroProps) => {
  return (
    <header className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight text-primary mb-6 animate-fade-in">
            Nias Business Forum
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in">
            Gather at our cozy Riyadh farmhouse with top founders and investors building the future of KSA
          </p>
          <Button
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in"
            onClick={onRequestInvite}
          >
            Request an Invite
          </Button>
        </div>
      </div>
    </header>
  );
};

export default EventHero;