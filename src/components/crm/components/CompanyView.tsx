
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { CompanyView, ContactStage } from "../types/kanban";
import ContactCard from "../ContactCard";

interface CompanyViewProps {
  companies: CompanyView[];
  stage: ContactStage;
  onUpdate: () => void;
}

const CompanyView = ({ companies, stage, onUpdate }: CompanyViewProps) => {
  const stageCompanies = companies.filter(company => company.stage === stage);

  return (
    <div className="space-y-4">
      {stageCompanies.map(company => (
        <Card key={company.id} className="p-4">
          <div className="mb-4">
            <h4 className="font-medium text-lg">{company.company}</h4>
            <div className="flex items-center justify-between mt-1">
              <p className="text-sm text-gray-500">
                {company.contacts.length} contact{company.contacts.length !== 1 ? 's' : ''}
              </p>
              {company.last_contact_date && (
                <p className="text-sm text-gray-600">
                  Last contact: {formatDistanceToNow(new Date(company.last_contact_date), { addSuffix: true })}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            {company.contacts.map(contact => (
              <ContactCard 
                key={contact.id} 
                contact={contact}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CompanyView;
