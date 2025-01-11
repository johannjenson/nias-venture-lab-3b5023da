const Footer = () => {
  const navigation = {
    main: [
      { name: "About", href: "#about", submenu: [
        { name: "Our Mission", href: "#mission" },
        { name: "People", href: "/people" },
        { name: "Contact", href: "#contact" }
      ]},
      { name: "Events", href: "#events", submenu: [
        { name: "February 20th in Riyadh", href: "/events/riyadh" }
      ]},
      { name: "Legal", submenu: [
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Use", href: "#terms" }
      ]},
    ],
    social: [
      {
        name: "LinkedIn",
        href: "#",
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: "Twitter",
        href: "#",
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        ),
      },
    ],
  };

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <div id="signup-form" className="pb-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Get Nias News
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Receive monthly insights on investing, M&A, and tech in KSA.
              </p>
            </div>
            <form className="max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              {item.submenu ? (
                <div>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-900">
                      {item.name}
                    </a>
                  ) : (
                    <span className="text-sm font-semibold leading-6 text-gray-900">
                      {item.name}
                    </span>
                  )}
                  <ul className="mt-2 space-y-2">
                    {item.submenu.map((subitem) => (
                      <li key={subitem.name}>
                        <a href={subitem.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                          {subitem.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <a href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                  {item.name}
                </a>
              )}
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="text-center mt-16">
          <a
            href="#join"
            className="inline-block bg-primary text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Join the Nias Network
          </a>
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; {new Date().getFullYear()} Nias.io. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;