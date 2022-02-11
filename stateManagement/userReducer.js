import * as Types from "./TYPES"
import { getAllRecipesFromUser } from "./recipeActions";
import { getNewCurrentKeys } from "../util/SettingShortcutsListeners"
import store from "./store";

const temporaryUserShortcuts = [
  {
    key: "Shift",
    keyCode: 16,
    isActive: true,
    code: "ShiftLeft",
    booleanCheck: "shiftKey",
    isSpecialKey: true,
  },
  {
    key: "Meta",
    keyCode: 91,
    isActive: true,
    code: "MetaLeft",
    booleanCheck: "metaKey",
    isSpecialKey: true,
  },
  {
    key: "k",
    keyCode: 75,
    isActive: true,
    code: "KeyK",
    booleanCheck: false,
    isSpecialKey: false,
  },
]


export const skEnum = [
  "setting",
  "hasOwn"
]


const initialState = {
  loggedIn: false,
  triedAutoLogin: false,
  allUsers: [],
  filtered: null,
  loading: false,
  self: {
    token: null,
    _id: null,
    userName: null,
    profileImgUrl: null,
  },
  userSettings: {
    allowKeyboardShortcuts: true,
    allowNotifications: true,
    allowRecipeReviews: true,
    // skString: "setting",
    skString: "",
    settingProgress: {
      elapsedTime: null,
      originalValue: null,
      percentage: null,
      toggle: null
    },
    keyboardShortcuts: temporaryUserShortcuts,
    currentActiveKeys: [],
    skListeners: {
      shiftKey: false,
      ctrlKey: false,
      metaKey: false,
      altKey: false,
    }
  },
  error: null,
};




export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case Types.AUTO_LOGIN_SUCCESS:
    case Types.AUTHENTICATE_USER:

      let newPayload = { ...action.payload };
      if (newPayload?.userProfileData) {
        delete newPayload.userProfileData;
      }
      return {
        ...state,
        loggedIn: true,
        triedAutoLogin: true,
        loading: false,
        self: newPayload,
      };
    case Types.REMOVE_RECIPE_REVIEW_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        triedAutoLogin: true,
        loading: false,
        self: action.payload.updatedUser,
      };
    case Types.LOGOUT:
      return initialState;
    case Types.AUTO_LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false,
        triedAutoLogin: true,
        loading: false,
      };

    case Types.RETURN_SINGLE_ITEM:
      return {
        ...state,
        self: { ...state.self },
        filtered: state.allUsers.filter((u) => u._id === action.payload._id),
      };
    case Types.GET_ALL_USERS:
      return {
        ...state,
        self: { ...state.self },
        allUsers: action.payload.user,
      };
    case Types.UPDATE_USER_INFO:
      const filteredUsers = state.allUsers.filter(
        (u) => u._id !== action.payload._id
      );
      filteredUsers.push(action.payload);
      return {
        ...state,
        self: { ...state.self },
        allUsers: filteredUsers,
      };
    case Types.REMOVE_USER:
      let filter = state.allUsers.filter(
        (u) => u._id !== action.payload.user._id
      );
      return {
        ...state,
        self: { ...state.self },
        allUsers: filter,
      };
    case Types.USER_ERROR:
      return {
        ...state,
        self: { ...state.self },
        error: action.payload,
      };
    case Types.REGISTER_NEW_USER:
      // array of 10 users
      return {
        ...state,
        loggedIn: true,
        loading: false,
        allUsers: [...state.allUsers, action.payload._doc],
        self: action.payload,
      };
    case Types.AUTHENTICATION_ERROR:
      return {
        ...state,
        // loggedIn: false,
        allUsers: [],
        loading: false,
        self: { ...state.self },
        error: action.payload,
      };
    case Types.SET_CURRENT_ACTIVE_KEYS:
      console.log("Setting current active keys with: ", action.payload);
      console.log("!state.userSettings.settingProgress.originalValue timer: ", !state.userSettings.settingProgress.originalValue);
      let timerData;
      if (action.payload?.currentActiveKeys.length === 3) {
        timerData = {
          // elapsedTime: state.userSettings.settingProgress.originalValue - Date.now(),
          ...(!state.userSettings.settingProgress.originalValue && { originalValue: Date.now() })
        }
        console.log("timerData: ", timerData);
      }
      console.log('...initialState.userSettings.settingProgress: ', { ...initialState.userSettings.settingProgress });
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          currentActiveKeys: action.payload?.currentActiveKeys,
          ...(timerData && { settingProgress: { ...timerData } }),
          ...(action.payload.currentActiveKeys.length < 3 && {timerData: { ...initialState.userSettings.settingProgress }})
          // ...(action.payload?.currentActiveKeys.length < 3 && { settingProgress: { ...initialState.userSettings.settingProgress } })
        },
      };
    case Types.CLEAR_SET_SHORTCUTS_TIMER: {
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          settingProgress: {
            ...initialState.userSettings.settingProgress,
          },
        },
      };
    }
    case Types.UPDATE_SHORTCUT_TIMER:
      console.log('action.payload: timer ', action.payload);
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          // currentActiveKeys: action.payload?.currentActiveKeys,
          settingProgress: {
            ...state.userSettings.settingProgress,
            elapsedTime: action.payload.elapsedTime,
            percentage: action.payload?.percentage,
            toggle: action.payload?.currentToggle,
          }
        },
      };
    case Types.SET_LISTENER_KEY:
      // TODO filter currentActiveKeys here based on metaKey changes
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          // currentActiveKeys: getNewCurrentKeys(action.payload),
          skListeners: {
            ...state.userSettings.skListeners,
            ...action.payload
          }
        }
      };
    case Types.CLEAR_CURRENT_ACTIVE_KEYS:
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          currentActiveKeys: [
            ...initialState.userSettings.currentActiveKeys,
          ],
          skListeners: {
            ...initialState.userSettings.skListeners,
          }
        }
      };
    case Types.SET_SK_STRING: 
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          skString: action.payload
        }
      };
    
    case Types.SET_NEW_CURRENT_SHORTCUTS:
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          skString: skEnum[1],
          keyboardShortcuts: [
            ...state.userSettings.currentActiveKeys
          ],
          allowKeyboardShortcuts: true,
          settingProgress: {
            ...initialState.userSettings.settingProgress,
          },
          // currentActiveKeys: [...initialState.userSettings.currentActiveKeys],
          skListeners: {
            ...initialState.userSettings.skListeners
          }        
        },
      };


    case Types.TOGGLE_ALLOW_SHORTCUTS:
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          allowKeyboardShortcuts: !state.userSettings.allowKeyboardShortcuts,
          
        },
      };
    default:
      return state;
  }
}
