// this is a copy of convert-to-radium-test.js, except that styles won't be imported
import React from "react";
import radium from "radium";
import styles from "styles/bad-styles.js";

import component from "component";
import fooBar from "fooBar";

@component
@fooBar({foo: "bar"})
@radium
class Article extends React.Component {
    render() {
        return (
            <div>
                // string literal classNames stay as classNames
                <span className="icon-class"></span>
                <span className="icon-class"></span>
                <span className="icon-class"></span>
                <span style={{width: "10px"}} className="icon-class"></span>

                // js objects will get converted to style tags
                // and merged into one object
                // Calls to the classNames module will be stripped out
                <span style={styles.one}></span>
                <span style={styles.one}></span>
                <span style={{
                    ...styles.one,
                    ...styles.two
                }}></span>
                <span
                    style={{
                        ...styles.one,
                        ...{width: "10px"}
                    }}></span>
                <span
                    style={{
                        ...styles.one,
                        ...styles.two
                    }}
                    className="icon other-icon"></span>

                // nodes with interactive styles (hover state, media queries)
                // don't get a "key" attribute added to them
                <span style={styles.hover}></span>
                <span style={styles.media1}></span>
                <span style={styles.media2}></span>
                <span style={styles.media3}></span>
                <span style={styles.media4}></span>

                // conditional styles in a classNames call cannot be
                // migrated programmatically, will stay unchanged
                <span className={classNames("icon", {"someStyle": booleanValue})}></span>
            </div>
        );
    }
}
