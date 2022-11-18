import {createContext} from 'react';

const ReloadContext = createContext({
    reload: false,
    toggleReload: prevState => !prevState
});

export default ReloadContext