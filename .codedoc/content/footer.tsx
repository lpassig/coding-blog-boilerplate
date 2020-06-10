import { CodedocConfig } from '@codedoc/core';
import { Footer as _Footer } from '@codedoc/core/components';


export function Footer(config: CodedocConfig, renderer: any) {
  return <_Footer>
    <a href="https://www.linkedin.com/in/lennart-passig-329430b8/">LinkedIn</a>  {/* --> link to linkedin*/}
    <hr/>
    <a href="https://twitter.com/lennoert">Twitter</a>          {/* --> link to twitter*/}
  </_Footer>;
}
