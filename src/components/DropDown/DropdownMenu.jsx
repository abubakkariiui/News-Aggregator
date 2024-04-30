import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";

function DropdownMenu({ handleSortBy, menuItems }) {
  const [selectedOption, setSelectedOption] = useState("relevance");

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    handleSortBy(option);
  };

  return (
    <div className="relative inline-block text-left">
      <Menu>
        <div>
          <Menu.Button className="border inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium   focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Sort By {selectedOption}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1">
              {menuItems.map((item) => (
                <Menu.Item key={item.value}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => handleSelectOption(item.value)}
                    >
                      {item.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

DropdownMenu.propTypes = {
  handleSortBy: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DropdownMenu;
