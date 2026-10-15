/**
 * Estados posibles de una vista o componente de la capa de presentación.
 *
 * @remarks
 * Se utiliza para gestionar la máquina de estados de las páginas
 * (cargando, éxito, error, etc.).
 */
export type State = 'init' | 'loading' | 'success' | 'error';
