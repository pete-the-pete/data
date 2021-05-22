import coerceId from '../system/coerce-id';
import isNonEmptyString from './is-non-empty-string';

type ResourceIdentifierObject = import('../ts-interfaces/ember-data-json-api').ResourceIdentifierObject;
type ExistingResourceIdentifierObject = import('../ts-interfaces/ember-data-json-api').ExistingResourceIdentifierObject;

function constructResource(type: string, id: string, lid?: string | null): ExistingResourceIdentifierObject;
function constructResource(type: string, id?: string | number | null, lid?: string | null): ResourceIdentifierObject;
function constructResource(
  type: string,
  id?: string | number | null,
  lid?: string | null
): ResourceIdentifierObject | ExistingResourceIdentifierObject {
  const trueId = coerceId(id);
  if (!isNonEmptyString(trueId)) {
    if (isNonEmptyString(lid)) {
      return { type, id: trueId, lid };
    }
    throw new Error(`Expected either id or lid to be a valid string`);
  }

  if (isNonEmptyString(lid)) {
    return { type, id: trueId, lid };
  }

  return { type, id: trueId };
}

export default constructResource;
