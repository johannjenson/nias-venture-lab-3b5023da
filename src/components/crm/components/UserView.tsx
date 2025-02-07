
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
    
  const networkRequests = stageContacts.filter(c => c.source === 'network_request');
  const otherContacts = stageContacts.filter(c => c.source !== 'network_request');

  return (
    <div className="space-y-4">
      {networkRequests.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-blue-600">Network Requests</h4>
          {networkRequests.map(contact => (
            <ContactCard 
              key={contact.id} 
              contact={contact}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
      {otherContacts.length > 0 && (
        <div className="space-y-2">
          {networkRequests.length > 0 && (
            <h4 className="text-sm font-medium text-gray-600">Other Contacts</h4>
          )}
          {otherContacts.map(contact => (
            <ContactCard 
              key={contact.id} 
              contact={contact}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserView;

