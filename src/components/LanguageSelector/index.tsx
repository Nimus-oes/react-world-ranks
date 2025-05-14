import { useTranslation } from "react-i18next";
import { Select } from "radix-ui";
import { GlobeIcon } from "@radix-ui/react-icons";
import { LANGUAGES } from "../../constants";
import styles from "./LanguageSelector.module.css";
import { AppLangType } from "../../types/models";

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const hanleChange = (value: AppLangType) => {
    i18n.changeLanguage(value);
    localStorage.setItem("appLanguage", value);
  };

  return (
    <Select.Root onValueChange={hanleChange}>
      <Select.Trigger className={styles.trigger}>
        <GlobeIcon />
        <Select.Value placeholder={t("language_selector")} />
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
