import React, {useState} from "react";
import image1 from "../../images-places/eii.jpg";
import image2 from "../../images-places/calatrava.jpg";
import image3 from "../../images-places/catedral-oviedo.jpg";



const getClassName = (...names: Array<string | undefined>) =>
  names.filter(Boolean).join(" ");

interface ComboboxContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const ComboboxContext = React.createContext<ComboboxContextProps>(
  {} as ComboboxContextProps
);

interface ComboboxProps {
  children: React.ReactNode;
}

const Combobox: React.FunctionComponent<ComboboxProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState("");
  React.useEffect(() => {
    if (isOpen) {
      const close = () => setIsOpen(false);
      window.addEventListener("click", close);
      return () => window.removeEventListener("click", close);
    }
  }, [isOpen]);
  const value = React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
      selectedItem,
      setSelectedItem,
      searchTerm,
      setSearchTerm
    }),
    [isOpen, searchTerm, selectedItem]
  );
  return (
    <ComboboxContext.Provider value={value}>
      {children}
    </ComboboxContext.Provider>
  );
};

const useComboboxContext = () => React.useContext(ComboboxContext);

interface ComboboxInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const ComboboxInput: React.FunctionComponent<ComboboxInputProps> = ({
  children,
  ...props
}) => {
  const {
    setIsOpen,
    searchTerm,
    selectedItem,
    setSelectedItem,
    setSearchTerm
  } = useComboboxContext();
  const refForId = React.useRef(Math.random().toString());
  return (
    <>
      <label htmlFor={refForId.current}>Select an image to upload:</label>
      <div>
        <input
          {...props}
          id={refForId.current}
          value={selectedItem || searchTerm}
          onChange={(e) => {
            const { value } = e.target;
            setSearchTerm(value);
            setSelectedItem("");
            setIsOpen(true);
          }}
          className={getClassName("combobox-input", props.className)}
          onClick={() => setIsOpen(true)}
        />
        {children}
      </div>
    </>
  );
};

interface ComboboxPopOverProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

const ComboboxPopOver: React.FunctionComponent<ComboboxPopOverProps> = ({
  children,
  ...props
}) => {
  const { isOpen } = useComboboxContext();
  if (!isOpen) return null;
  return (
    <div
      {...props}
      className={getClassName("combobox-popover", props.className)}
    >
      {children}
    </div>
  );
};

interface ComboboxListProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {}

const ComboboxList: React.FunctionComponent<ComboboxListProps> = ({
  children,
  ...props
}) => {
  return (
    <ul {...props} className={getClassName("combobox-list", props.className)}>
      {children}
    </ul>
  );
};

interface ComboboxListItemProps
  extends React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  > {
  value: string;
}

const ComboboxListItem: React.FunctionComponent<ComboboxListItemProps> = ({
  value,
  children,
  ...props
}) => {
  const {
    searchTerm,
    setSearchTerm,
    setSelectedItem,
    selectedItem
  } = useComboboxContext();
  if (searchTerm && !value.toLowerCase().startsWith(searchTerm.toLowerCase())) {
    return null;
  }
  const isSelected = value === selectedItem;
  return (
    <li
      {...props}
      onClick={(e) => {
        setSearchTerm("");
        setSelectedItem(value);
        if (props.onClick) props.onClick(e);
      }}
      className={getClassName(
        "combobox-list-item",
        props.className,
        isSelected ? "selected" : ""
      )}
    >
      {children}
    </li>
  );
};

export default function App() {
  const [list,setList] = useState<string[]>([image1]);
  const [item,setItem] = useState<string>();
  return (
    <div className="App">
      <Combobox>
        <ComboboxInput>
          <ComboboxPopOver>
            <ComboboxList>
              {list.map((item) => (
                <ComboboxListItem key={item} value={item}>
                  {item}
                </ComboboxListItem>
              )
              )}
            </ComboboxList>
          </ComboboxPopOver>
        </ComboboxInput>
      </Combobox>
    </div>
  );
}
