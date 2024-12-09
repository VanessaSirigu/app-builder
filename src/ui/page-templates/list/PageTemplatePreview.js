import React from 'react';
import PropTypes from 'prop-types';
import PageConfigGrid from 'ui/pages/config/PageConfigGrid';
import { getCellMap } from 'state/page-templates/helpers';

const PageTemplatePreview = ({ item, actions }) => {
  const { descr } = item;
  const cellMap = getCellMap(item);

  return (
    <div className="Page_Template_Preview_Container">
      <div className="Page_Template_Preview_Content">
        {actions && (
          <div className="Page_Template_Preview_Actions">
            {actions}
          </div>
        )}
        <div className="Page_Config_Grid_Container">
          <PageConfigGrid cellMap={cellMap} />
        </div>
      </div>
      {descr}
    </div>
  );
};

PageTemplatePreview.propTypes =
  {
    item: PropTypes.shape({
      code: PropTypes.string.isRequired,
      descr: PropTypes.string.isRequired,
      mainFrame: PropTypes.number.isRequired,
      pluginCode: PropTypes.string,
      template: PropTypes.string.isRequired,
      extraProperties: PropTypes.string,
      configuration: PropTypes.shape({
        frames: PropTypes.shape({
          pos: PropTypes.string.isRequired,
          descr: PropTypes.string.isRequired,
          defaultWidget: PropTypes.shape({
            code: PropTypes.string.isRequired,
          }).isRequired,
          sketch: PropTypes.shape({
            x1: PropTypes.number.isRequired,
            x2: PropTypes.number.isRequired,
            y1: PropTypes.number.isRequired,
            y2: PropTypes.number.isRequired,
          }),
        }),
      }).isRequired,
    }),
    action: PropTypes.func,
  }.isRequired;

export default PageTemplatePreview;
