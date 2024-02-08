/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface ButtonContainer {
    }
    interface CaptureCycle {
    }
    interface CaptureCycleConfirmPhotoFailScreen {
        "error": string | undefined;
    }
    interface CaptureCycleConfirmPhotoSuccessScreen {
    }
    interface CaptureCycleDisplayPhotoGrid {
        "addImageDataUrls": (newImageDataUrls: string) => Promise<void>;
        "clearImageDataUrls": () => Promise<void>;
    }
    interface CaptureCycleDisplaySelectedPhoto {
        "selectedImageDataUrl"?: string;
    }
    interface CaptureCycleDisplayStream {
        "capture": () => Promise<string | undefined>;
        "countdown": (p: { start: number; stop: number; clear: boolean; delayInMs?: number | undefined; cb?: ((num: number) => Promise<any> | any) | undefined; }) => Promise<void>;
        "streamSettings": {
    videoElementWidth: number;
    videoElementHeight: number;
    mediaWidth: number;
    mediaHeight: number;
    aspectRatio: number;
  };
    }
    interface CaptureCycleGetStreamSettings {
        "aspectRatio": number;
        "idealWidth": number;
    }
    interface CreateNewEventForm {
    }
    interface CustomH1 {
    }
    interface CustomH2 {
    }
    interface DumbCaptureCycle {
        "streamSettings": {
    videoElementWidth: number;
    videoElementHeight: number;
    mediaWidth: number;
    mediaHeight: number;
    aspectRatio: number;
  };
    }
    interface EventList {
    }
    interface HalfScreenSection {
    }
    interface RootComponent {
    }
    interface UserAuthCard {
    }
    interface UserCreateForm {
    }
    interface UserLoginForm {
    }
}
export interface CaptureCycleConfirmPhotoFailScreenCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCaptureCycleConfirmPhotoFailScreenElement;
}
export interface CaptureCycleConfirmPhotoSuccessScreenCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCaptureCycleConfirmPhotoSuccessScreenElement;
}
export interface CaptureCycleDisplayPhotoGridCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCaptureCycleDisplayPhotoGridElement;
}
export interface CaptureCycleGetStreamSettingsCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCaptureCycleGetStreamSettingsElement;
}
export interface CreateNewEventFormCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCreateNewEventFormElement;
}
export interface UserCreateFormCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLUserCreateFormElement;
}
export interface UserLoginFormCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLUserLoginFormElement;
}
declare global {
    interface HTMLButtonContainerElement extends Components.ButtonContainer, HTMLStencilElement {
    }
    var HTMLButtonContainerElement: {
        prototype: HTMLButtonContainerElement;
        new (): HTMLButtonContainerElement;
    };
    interface HTMLCaptureCycleElement extends Components.CaptureCycle, HTMLStencilElement {
    }
    var HTMLCaptureCycleElement: {
        prototype: HTMLCaptureCycleElement;
        new (): HTMLCaptureCycleElement;
    };
    interface HTMLCaptureCycleConfirmPhotoFailScreenElementEventMap {
        "startAgainClick": any;
    }
    interface HTMLCaptureCycleConfirmPhotoFailScreenElement extends Components.CaptureCycleConfirmPhotoFailScreen, HTMLStencilElement {
        addEventListener<K extends keyof HTMLCaptureCycleConfirmPhotoFailScreenElementEventMap>(type: K, listener: (this: HTMLCaptureCycleConfirmPhotoFailScreenElement, ev: CaptureCycleConfirmPhotoFailScreenCustomEvent<HTMLCaptureCycleConfirmPhotoFailScreenElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLCaptureCycleConfirmPhotoFailScreenElementEventMap>(type: K, listener: (this: HTMLCaptureCycleConfirmPhotoFailScreenElement, ev: CaptureCycleConfirmPhotoFailScreenCustomEvent<HTMLCaptureCycleConfirmPhotoFailScreenElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLCaptureCycleConfirmPhotoFailScreenElement: {
        prototype: HTMLCaptureCycleConfirmPhotoFailScreenElement;
        new (): HTMLCaptureCycleConfirmPhotoFailScreenElement;
    };
    interface HTMLCaptureCycleConfirmPhotoSuccessScreenElementEventMap {
        "startAgainClick": any;
    }
    interface HTMLCaptureCycleConfirmPhotoSuccessScreenElement extends Components.CaptureCycleConfirmPhotoSuccessScreen, HTMLStencilElement {
        addEventListener<K extends keyof HTMLCaptureCycleConfirmPhotoSuccessScreenElementEventMap>(type: K, listener: (this: HTMLCaptureCycleConfirmPhotoSuccessScreenElement, ev: CaptureCycleConfirmPhotoSuccessScreenCustomEvent<HTMLCaptureCycleConfirmPhotoSuccessScreenElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLCaptureCycleConfirmPhotoSuccessScreenElementEventMap>(type: K, listener: (this: HTMLCaptureCycleConfirmPhotoSuccessScreenElement, ev: CaptureCycleConfirmPhotoSuccessScreenCustomEvent<HTMLCaptureCycleConfirmPhotoSuccessScreenElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLCaptureCycleConfirmPhotoSuccessScreenElement: {
        prototype: HTMLCaptureCycleConfirmPhotoSuccessScreenElement;
        new (): HTMLCaptureCycleConfirmPhotoSuccessScreenElement;
    };
    interface HTMLCaptureCycleDisplayPhotoGridElementEventMap {
        "selectPhoto": string;
    }
    interface HTMLCaptureCycleDisplayPhotoGridElement extends Components.CaptureCycleDisplayPhotoGrid, HTMLStencilElement {
        addEventListener<K extends keyof HTMLCaptureCycleDisplayPhotoGridElementEventMap>(type: K, listener: (this: HTMLCaptureCycleDisplayPhotoGridElement, ev: CaptureCycleDisplayPhotoGridCustomEvent<HTMLCaptureCycleDisplayPhotoGridElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLCaptureCycleDisplayPhotoGridElementEventMap>(type: K, listener: (this: HTMLCaptureCycleDisplayPhotoGridElement, ev: CaptureCycleDisplayPhotoGridCustomEvent<HTMLCaptureCycleDisplayPhotoGridElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLCaptureCycleDisplayPhotoGridElement: {
        prototype: HTMLCaptureCycleDisplayPhotoGridElement;
        new (): HTMLCaptureCycleDisplayPhotoGridElement;
    };
    interface HTMLCaptureCycleDisplaySelectedPhotoElement extends Components.CaptureCycleDisplaySelectedPhoto, HTMLStencilElement {
    }
    var HTMLCaptureCycleDisplaySelectedPhotoElement: {
        prototype: HTMLCaptureCycleDisplaySelectedPhotoElement;
        new (): HTMLCaptureCycleDisplaySelectedPhotoElement;
    };
    interface HTMLCaptureCycleDisplayStreamElement extends Components.CaptureCycleDisplayStream, HTMLStencilElement {
    }
    var HTMLCaptureCycleDisplayStreamElement: {
        prototype: HTMLCaptureCycleDisplayStreamElement;
        new (): HTMLCaptureCycleDisplayStreamElement;
    };
    interface HTMLCaptureCycleGetStreamSettingsElementEventMap {
        "initSettingsError": string;
        "initSettingsComplete": {
    videoElementWidth: number;
    videoElementHeight: number;
    mediaWidth: number;
    mediaHeight: number;
    aspectRatio: number;
    imageDataUrlLength?: number;
  };
    }
    interface HTMLCaptureCycleGetStreamSettingsElement extends Components.CaptureCycleGetStreamSettings, HTMLStencilElement {
        addEventListener<K extends keyof HTMLCaptureCycleGetStreamSettingsElementEventMap>(type: K, listener: (this: HTMLCaptureCycleGetStreamSettingsElement, ev: CaptureCycleGetStreamSettingsCustomEvent<HTMLCaptureCycleGetStreamSettingsElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLCaptureCycleGetStreamSettingsElementEventMap>(type: K, listener: (this: HTMLCaptureCycleGetStreamSettingsElement, ev: CaptureCycleGetStreamSettingsCustomEvent<HTMLCaptureCycleGetStreamSettingsElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLCaptureCycleGetStreamSettingsElement: {
        prototype: HTMLCaptureCycleGetStreamSettingsElement;
        new (): HTMLCaptureCycleGetStreamSettingsElement;
    };
    interface HTMLCreateNewEventFormElementEventMap {
        "createEventSuccess": any;
    }
    interface HTMLCreateNewEventFormElement extends Components.CreateNewEventForm, HTMLStencilElement {
        addEventListener<K extends keyof HTMLCreateNewEventFormElementEventMap>(type: K, listener: (this: HTMLCreateNewEventFormElement, ev: CreateNewEventFormCustomEvent<HTMLCreateNewEventFormElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLCreateNewEventFormElementEventMap>(type: K, listener: (this: HTMLCreateNewEventFormElement, ev: CreateNewEventFormCustomEvent<HTMLCreateNewEventFormElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLCreateNewEventFormElement: {
        prototype: HTMLCreateNewEventFormElement;
        new (): HTMLCreateNewEventFormElement;
    };
    interface HTMLCustomH1Element extends Components.CustomH1, HTMLStencilElement {
    }
    var HTMLCustomH1Element: {
        prototype: HTMLCustomH1Element;
        new (): HTMLCustomH1Element;
    };
    interface HTMLCustomH2Element extends Components.CustomH2, HTMLStencilElement {
    }
    var HTMLCustomH2Element: {
        prototype: HTMLCustomH2Element;
        new (): HTMLCustomH2Element;
    };
    interface HTMLDumbCaptureCycleElement extends Components.DumbCaptureCycle, HTMLStencilElement {
    }
    var HTMLDumbCaptureCycleElement: {
        prototype: HTMLDumbCaptureCycleElement;
        new (): HTMLDumbCaptureCycleElement;
    };
    interface HTMLEventListElement extends Components.EventList, HTMLStencilElement {
    }
    var HTMLEventListElement: {
        prototype: HTMLEventListElement;
        new (): HTMLEventListElement;
    };
    interface HTMLHalfScreenSectionElement extends Components.HalfScreenSection, HTMLStencilElement {
    }
    var HTMLHalfScreenSectionElement: {
        prototype: HTMLHalfScreenSectionElement;
        new (): HTMLHalfScreenSectionElement;
    };
    interface HTMLRootComponentElement extends Components.RootComponent, HTMLStencilElement {
    }
    var HTMLRootComponentElement: {
        prototype: HTMLRootComponentElement;
        new (): HTMLRootComponentElement;
    };
    interface HTMLUserAuthCardElement extends Components.UserAuthCard, HTMLStencilElement {
    }
    var HTMLUserAuthCardElement: {
        prototype: HTMLUserAuthCardElement;
        new (): HTMLUserAuthCardElement;
    };
    interface HTMLUserCreateFormElementEventMap {
        "createUserSuccess": any;
        "createUserFail": any;
    }
    interface HTMLUserCreateFormElement extends Components.UserCreateForm, HTMLStencilElement {
        addEventListener<K extends keyof HTMLUserCreateFormElementEventMap>(type: K, listener: (this: HTMLUserCreateFormElement, ev: UserCreateFormCustomEvent<HTMLUserCreateFormElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLUserCreateFormElementEventMap>(type: K, listener: (this: HTMLUserCreateFormElement, ev: UserCreateFormCustomEvent<HTMLUserCreateFormElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLUserCreateFormElement: {
        prototype: HTMLUserCreateFormElement;
        new (): HTMLUserCreateFormElement;
    };
    interface HTMLUserLoginFormElementEventMap {
        "loginSuccess": any;
        "loginFail": any;
    }
    interface HTMLUserLoginFormElement extends Components.UserLoginForm, HTMLStencilElement {
        addEventListener<K extends keyof HTMLUserLoginFormElementEventMap>(type: K, listener: (this: HTMLUserLoginFormElement, ev: UserLoginFormCustomEvent<HTMLUserLoginFormElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLUserLoginFormElementEventMap>(type: K, listener: (this: HTMLUserLoginFormElement, ev: UserLoginFormCustomEvent<HTMLUserLoginFormElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLUserLoginFormElement: {
        prototype: HTMLUserLoginFormElement;
        new (): HTMLUserLoginFormElement;
    };
    interface HTMLElementTagNameMap {
        "button-container": HTMLButtonContainerElement;
        "capture-cycle": HTMLCaptureCycleElement;
        "capture-cycle-confirm-photo-fail-screen": HTMLCaptureCycleConfirmPhotoFailScreenElement;
        "capture-cycle-confirm-photo-success-screen": HTMLCaptureCycleConfirmPhotoSuccessScreenElement;
        "capture-cycle-display-photo-grid": HTMLCaptureCycleDisplayPhotoGridElement;
        "capture-cycle-display-selected-photo": HTMLCaptureCycleDisplaySelectedPhotoElement;
        "capture-cycle-display-stream": HTMLCaptureCycleDisplayStreamElement;
        "capture-cycle-get-stream-settings": HTMLCaptureCycleGetStreamSettingsElement;
        "create-new-event-form": HTMLCreateNewEventFormElement;
        "custom-h1": HTMLCustomH1Element;
        "custom-h2": HTMLCustomH2Element;
        "dumb-capture-cycle": HTMLDumbCaptureCycleElement;
        "event-list": HTMLEventListElement;
        "half-screen-section": HTMLHalfScreenSectionElement;
        "root-component": HTMLRootComponentElement;
        "user-auth-card": HTMLUserAuthCardElement;
        "user-create-form": HTMLUserCreateFormElement;
        "user-login-form": HTMLUserLoginFormElement;
    }
}
declare namespace LocalJSX {
    interface ButtonContainer {
    }
    interface CaptureCycle {
    }
    interface CaptureCycleConfirmPhotoFailScreen {
        "error"?: string | undefined;
        "onStartAgainClick"?: (event: CaptureCycleConfirmPhotoFailScreenCustomEvent<any>) => void;
    }
    interface CaptureCycleConfirmPhotoSuccessScreen {
        "onStartAgainClick"?: (event: CaptureCycleConfirmPhotoSuccessScreenCustomEvent<any>) => void;
    }
    interface CaptureCycleDisplayPhotoGrid {
        "onSelectPhoto"?: (event: CaptureCycleDisplayPhotoGridCustomEvent<string>) => void;
    }
    interface CaptureCycleDisplaySelectedPhoto {
        "selectedImageDataUrl"?: string;
    }
    interface CaptureCycleDisplayStream {
        "streamSettings": {
    videoElementWidth: number;
    videoElementHeight: number;
    mediaWidth: number;
    mediaHeight: number;
    aspectRatio: number;
  };
    }
    interface CaptureCycleGetStreamSettings {
        "aspectRatio": number;
        "idealWidth": number;
        "onInitSettingsComplete"?: (event: CaptureCycleGetStreamSettingsCustomEvent<{
    videoElementWidth: number;
    videoElementHeight: number;
    mediaWidth: number;
    mediaHeight: number;
    aspectRatio: number;
    imageDataUrlLength?: number;
  }>) => void;
        "onInitSettingsError"?: (event: CaptureCycleGetStreamSettingsCustomEvent<string>) => void;
    }
    interface CreateNewEventForm {
        "onCreateEventSuccess"?: (event: CreateNewEventFormCustomEvent<any>) => void;
    }
    interface CustomH1 {
    }
    interface CustomH2 {
    }
    interface DumbCaptureCycle {
        "streamSettings": {
    videoElementWidth: number;
    videoElementHeight: number;
    mediaWidth: number;
    mediaHeight: number;
    aspectRatio: number;
  };
    }
    interface EventList {
    }
    interface HalfScreenSection {
    }
    interface RootComponent {
    }
    interface UserAuthCard {
    }
    interface UserCreateForm {
        "onCreateUserFail"?: (event: UserCreateFormCustomEvent<any>) => void;
        "onCreateUserSuccess"?: (event: UserCreateFormCustomEvent<any>) => void;
    }
    interface UserLoginForm {
        "onLoginFail"?: (event: UserLoginFormCustomEvent<any>) => void;
        "onLoginSuccess"?: (event: UserLoginFormCustomEvent<any>) => void;
    }
    interface IntrinsicElements {
        "button-container": ButtonContainer;
        "capture-cycle": CaptureCycle;
        "capture-cycle-confirm-photo-fail-screen": CaptureCycleConfirmPhotoFailScreen;
        "capture-cycle-confirm-photo-success-screen": CaptureCycleConfirmPhotoSuccessScreen;
        "capture-cycle-display-photo-grid": CaptureCycleDisplayPhotoGrid;
        "capture-cycle-display-selected-photo": CaptureCycleDisplaySelectedPhoto;
        "capture-cycle-display-stream": CaptureCycleDisplayStream;
        "capture-cycle-get-stream-settings": CaptureCycleGetStreamSettings;
        "create-new-event-form": CreateNewEventForm;
        "custom-h1": CustomH1;
        "custom-h2": CustomH2;
        "dumb-capture-cycle": DumbCaptureCycle;
        "event-list": EventList;
        "half-screen-section": HalfScreenSection;
        "root-component": RootComponent;
        "user-auth-card": UserAuthCard;
        "user-create-form": UserCreateForm;
        "user-login-form": UserLoginForm;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "button-container": LocalJSX.ButtonContainer & JSXBase.HTMLAttributes<HTMLButtonContainerElement>;
            "capture-cycle": LocalJSX.CaptureCycle & JSXBase.HTMLAttributes<HTMLCaptureCycleElement>;
            "capture-cycle-confirm-photo-fail-screen": LocalJSX.CaptureCycleConfirmPhotoFailScreen & JSXBase.HTMLAttributes<HTMLCaptureCycleConfirmPhotoFailScreenElement>;
            "capture-cycle-confirm-photo-success-screen": LocalJSX.CaptureCycleConfirmPhotoSuccessScreen & JSXBase.HTMLAttributes<HTMLCaptureCycleConfirmPhotoSuccessScreenElement>;
            "capture-cycle-display-photo-grid": LocalJSX.CaptureCycleDisplayPhotoGrid & JSXBase.HTMLAttributes<HTMLCaptureCycleDisplayPhotoGridElement>;
            "capture-cycle-display-selected-photo": LocalJSX.CaptureCycleDisplaySelectedPhoto & JSXBase.HTMLAttributes<HTMLCaptureCycleDisplaySelectedPhotoElement>;
            "capture-cycle-display-stream": LocalJSX.CaptureCycleDisplayStream & JSXBase.HTMLAttributes<HTMLCaptureCycleDisplayStreamElement>;
            "capture-cycle-get-stream-settings": LocalJSX.CaptureCycleGetStreamSettings & JSXBase.HTMLAttributes<HTMLCaptureCycleGetStreamSettingsElement>;
            "create-new-event-form": LocalJSX.CreateNewEventForm & JSXBase.HTMLAttributes<HTMLCreateNewEventFormElement>;
            "custom-h1": LocalJSX.CustomH1 & JSXBase.HTMLAttributes<HTMLCustomH1Element>;
            "custom-h2": LocalJSX.CustomH2 & JSXBase.HTMLAttributes<HTMLCustomH2Element>;
            "dumb-capture-cycle": LocalJSX.DumbCaptureCycle & JSXBase.HTMLAttributes<HTMLDumbCaptureCycleElement>;
            "event-list": LocalJSX.EventList & JSXBase.HTMLAttributes<HTMLEventListElement>;
            "half-screen-section": LocalJSX.HalfScreenSection & JSXBase.HTMLAttributes<HTMLHalfScreenSectionElement>;
            "root-component": LocalJSX.RootComponent & JSXBase.HTMLAttributes<HTMLRootComponentElement>;
            "user-auth-card": LocalJSX.UserAuthCard & JSXBase.HTMLAttributes<HTMLUserAuthCardElement>;
            "user-create-form": LocalJSX.UserCreateForm & JSXBase.HTMLAttributes<HTMLUserCreateFormElement>;
            "user-login-form": LocalJSX.UserLoginForm & JSXBase.HTMLAttributes<HTMLUserLoginFormElement>;
        }
    }
}
