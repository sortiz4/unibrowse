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
        this.componentDidMount = this.afterMount;
        this.componentWillUnmount = this.beforeUnmount;
        this.shouldComponentUpdate = this.shouldUpdate;
        this.componentDidUpdate = this.afterUpdate;
        this.componentDidCatch = this.afterCatch;
    }

    afterMount() {
        // Default behavior (empty)
    }

    beforeUnmount() {
        // Default behavior (empty)
    }

    shouldUpdate(nextProps, nextState) {
        // Default behavior (true)
        return true;
    }

    afterUpdate(prevProps, prevState, snapshot) {
        // Default behavior (empty)
    }

    afterCatch(error, info) {
        // Default behavior (empty)
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

export class PureComponent extends Component {
    shouldUpdate(nextProps) {
        // Only perform a shallow comparison on properties because the
        // component state may exist outside of it's traditional context
        if(this.props === nextProps) {
            return true;
        }
        const thisKeys = Object.keys(this.props);
        const nextKeys = Object.keys(nextProps);
        if(thisKeys.length !== nextKeys.length) {
            return false;
        }
        for(const key of thisKeys) {
            if(this.props[key] !== nextProps[key]) {
                return false;
            }
        }
        return true;
    }
}
