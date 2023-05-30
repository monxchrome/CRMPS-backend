import { removeOldTokens } from "./old.tokens.delete.cron";

export const cronRunner = () => {
  removeOldTokens.start();
};
