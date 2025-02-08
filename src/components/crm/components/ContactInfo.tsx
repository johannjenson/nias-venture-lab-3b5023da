
import React from "react";
import { Contact } from "../types/contact-details";

interface ContactInfoProps {
  contact: Contact;
}

const ContactInfo = ({ contact }: ContactInfoProps) => {
  return (
    <div>
      <h4 className="font-medium mb-2">Contact Details</h4>
      <div className="space-y-2 text-sm">
        <p><span className="text-gray-500">Company:</span> {contact.company}</p>
        <p><span className="text-gray-500">Title:</span> {contact.title}</p>
        <p><span className="text-gray-500">Email:</span> {contact.email}</p>
      </div>
    </div>
  );
};

export default ContactInfo;

