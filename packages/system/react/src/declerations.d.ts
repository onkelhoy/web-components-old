type HTMLAttributes = {
  class?: string;
  id?: string;
  slot?: string;
}
type PapReactElement<T extends HTMLAttributes, OmitKeys extends keyof T = never> = Omit<T, "class" | OmitKeys> & {
  className?: string;
  children?: React.ReactNode;
}