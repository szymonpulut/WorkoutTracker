import React from 'react';

import Navigation from 'components/BottomHeader/BottomHeader';
import Header from 'components/TopNavigation/TopNavigation';
import Workout from 'containers/Workout/Workout';

const Layout: React.FC = () => {
    return (
        <>
            <Header />
            <Workout />
            <Navigation />
        </>
    );
};

export default Layout;
