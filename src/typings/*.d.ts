declare interface Window{
  
}

declare interface IDispatch{
  (args: any): void
}

declare interface IAction {
  type: string
  payload?: any
}