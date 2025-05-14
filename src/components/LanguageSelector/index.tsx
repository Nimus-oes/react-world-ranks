import { Select } from "radix-ui";
import { GlobeIcon } from "@radix-ui/react-icons";
import { LANGUAGES } from "../../constants";
import styles from "./LanguageSelector.module.css";

export default function LanguageSelector() {
  return (
    <Select.Root>
      <Select.Trigger className={styles.trigger}>
        <GlobeIcon />
        <Select.Value placeholder="Language" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          className={styles.content}
          sideOffset={5}
        >
          <Select.Viewport>
            {LANGUAGES.map((item) => (
              <Select.Item
                key={item.lng}
                value={item.lng}
                className={styles.item}
              >
                <Select.ItemText>{item.text}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
