import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import {
  showMessage,
  hideMessage,
  MessageType,
} from "react-native-flash-message";

export class GeneralHelper {
  static generateRandomId() {
    return uuidv4();
  }

  static showToast(message: string, type: MessageType) {
    showMessage({
      message,
      type,
    });
  }
}
