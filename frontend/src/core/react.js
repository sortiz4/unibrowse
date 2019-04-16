import {Component as BaseComponent} from 'react';
export {default as React, Fragment} from 'react';
export {default as ReactDom} from 'react-dom';

/**
 * The set state method is modified to support arbitrary updater callbacks
 * similar to Flutter. The goal is to reduce the verbosity associated with
 * component state. Lifecycle hooks have also been aliased.
 */
export class Component extends BaseComponent {
    constructor(props) {
        super(props);

        // Alias the lifecycle methods
        this.componentDidCatch = this.afterCatch;
        this.componentDidMount = this.afterMount;
        this.componentDidUpdate = this.afterUpdate;
        this.componentWillUnmount = this.beforeUnmount;
        this.shouldComponentUpdate = this.shouldUpdate;
        this.UNSAFE_componentWillMount = this.beforeMount;
        this.UNSAFE_componentWillReceiveProps = this.beforeProps;
        this.UNSAFE_componentWillUpdate = this.beforeUpdate;

        // Monkey patch the render method
        const render = this.render.bind(this);
        this.render = () => render(this.props);
    }

    setState(updater, callback) {
        // Updates mutate the component
        switch(typeof updater) {
            case 'function':
                return super.setState(
                    (state, props) => {
                        updater(state, props);
                        return true;
                    },
                    callback,
                );
            case 'object':
                return super.setState(
                    () => {
                        Object.assign(this, updater);
                        return true;
                    },
                    callback,
                );
        }

        // Default behavior resumes
        return super.setState(updater, callback);
    }
}
