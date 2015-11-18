import React from "react";
import GridironComponent from "@nfl/gridiron";

@component
@fooBar({foo: "bar"})
class DebugPanel extends GridironComponent {
    render() {
        return (
            <div> test </div>
        );
    }
}

export default DebugPanel;
