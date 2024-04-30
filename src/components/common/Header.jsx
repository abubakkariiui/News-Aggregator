import { Fragment, useState, useRef, useEffect } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from "../../utils/icons";
import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";

const newsTypes = [
  {
    name: "Word News",
    description:
      "Stay informed about global events and trends shaping the world.",
    href: "/",
    icon: GlobeAltIcon,
  },
  {
    name: "UK News",
    description:
      "Stay up-to-date with news and events happening in the United Kingdom.",
    href: "/",
    icon: GlobeAltIcon,
  },
  {
    name: "Science",
    description:
      "Explore breakthroughs and discoveries in the world of science and technology.",
    href: "/",
    icon: GlobeAltIcon,
  },
  {
    name: "Business",
    description:
      "Stay ahead in the world of business with news on markets, finance, and industry trends.",
    href: "/",
    icon: GlobeAltIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const popoverRef = useRef(null); // Ref for popover panel

  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        // Clicked outside the popover panel
        closePopover();
      }
    }

    // Add event listener when the popover is open
    if (desktopMenuOpen || mobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    // Remove event listener when the popover is closed
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [desktopMenuOpen, mobileMenuOpen]);

  const closePopover = () => {
    setDesktopMenuOpen(false);
    setMobileMenuOpen(false); // Close mobile menu as well
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <p className="text-2xl uppercase font-semibold">HeadlineHub</p>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          {/* Popover */}
          <Popover className="relative" ref={popoverRef}>
            {/* Popover Button */}
            <Popover.Button
              onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
            >
              News
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>
            {/* Popover Panel */}
            <Transition
              as={Fragment}
              show={desktopMenuOpen}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {newsTypes.map((item) => (
                    <div
                      key={item.name}
                      onClick={closePopover}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link
                          to={item.href}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          {/* Other menu items */}
          <Link
            to="/business"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Business
          </Link>
          <Link
            to="/tech"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Tech
          </Link>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            More
          </a>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <form
              className="flex w-full max-w-80 lg:ml-8"
              onSubmit={handleSubmit}
            >
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full border h-11 pl-10 pr-3 text-sm font-semibold leading-6 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent rounded-lg"
                  placeholder="Search business, sports, health, technology..."
                  type="search"
                />
              </div>
              
            </form>
          </div>
        </div>
      </nav>
      {/* Mobile menu */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <p className="text-2xl uppercase font-semibold">HeadlineHub</p>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        News
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                    </>
                  )}
                </Disclosure>
                <Link
                  to="/business"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Business
                </Link>
                <Link
                  to="/tech"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Tech
                </Link>
                <Link
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  More
                </Link>
              </div>
              <div className="py-6">
                <div className="lg:flex lg:justify-end">
                  <form
                    className="flex w-full max-w-auto lg:ml-8"
                    onSubmit={handleSubmit}
                  >
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MagnifyingGlassIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full border h-11 pl-10 pr-3 text-sm font-semibold leading-6 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent rounded-lg"
                        placeholder="Search business, sports, health, technology..."
                        type="search"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
