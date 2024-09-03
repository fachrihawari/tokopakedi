import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

function Footer() {
  const footerData = [
    {
      title: "About Us",
      links: [
        { text: "About Our Company", href: "#" },
        { text: "Career", href: "#" },
        { text: "Blog", href: "#" },
        { text: "Policies", href: "#" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { text: "Help Center", href: "#" },
        { text: "Contact Us", href: "#" },
        { text: "How to Shop", href: "#" },
        { text: "Shipping & Delivery", href: "#" },
      ],
    },
    {
      title: "Partnerships",
      links: [
        { text: "Sell on Our Platform", href: "#" },
        { text: "Affiliate Program", href: "#" },
        { text: "Advertise with Us", href: "#" },
      ],
    },
  ];

  const socialIcons = [
    { Icon: FiFacebook, href: "#" },
    { Icon: FiTwitter, href: "#" },
    { Icon: FiInstagram, href: "#" },
    { Icon: FiYoutube, href: "#" },
  ];

  return (
    <footer className="pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {footerData.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-gray-600 hover:text-green-500">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, href }, index) => (
                <a key={index} href={href} className="text-gray-600 hover:text-green-500">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-8">
          <p className="text-center text-gray-500">© 2024 TokoPakEdi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
