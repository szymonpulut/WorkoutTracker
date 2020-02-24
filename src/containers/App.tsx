import React from 'react';

import Layout from 'components/Layout/Layout';

import styles from './App.module.scss';

const App: React.FC = () => {
    return (
        <div className={styles.App}>
            <Layout />
        </div>
    );
};

export default App;
