
import { Contact, ContactStage } from "../types/kanban";
import ContactCard from "../ContactCard";

interface UserViewProps {
  contacts: Contact[];
  stage: ContactStage;
  onUpdate: () => void;
}

const UserView = ({ contacts, stage, onUpdate }: UserViewProps) => {
  const stageContacts = contacts
    .filter(c => c.stage === stage)
    .sort((a, b) => b.heat_rating - a.heat_rating); // Sort by heat rating descending
    
  return (
    <div className="space-y-2">
      {stageContacts.map(contact => (
        <ContactCard 
          key={contact.id} 
          contact={contact}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default UserView;
