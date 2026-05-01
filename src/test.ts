import 'zone.js/testing';
import {
  TestBed,
  getTestBed,
  TestModuleMetadata,
} from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Type,
} from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

const originalConfigureTestingModule =
  TestBed.configureTestingModule.bind(TestBed);

const hasSchema = (schemas: any[] | undefined, schema: any): boolean =>
  Array.isArray(schemas) && schemas.includes(schema);

const hasImport = (imports: any[] | undefined, moduleOrComponent: any): boolean =>
  Array.isArray(imports) && imports.includes(moduleOrComponent);

const isStandaloneDeclaration = (item: any): item is Type<unknown> =>
  !!item?.ɵcmp?.standalone ||
  !!item?.ɵdir?.standalone ||
  !!item?.ɵpipe?.standalone;

TestBed.configureTestingModule = (
  moduleDef: TestModuleMetadata
): TestBed => {
  const patched: TestModuleMetadata = { ...moduleDef };

  const declarations = [...(patched.declarations ?? [])];
  const imports = [...(patched.imports ?? [])];
  const schemas = [...(patched.schemas ?? [])];

  const standaloneItems = declarations.filter(isStandaloneDeclaration);
  patched.declarations = declarations.filter((d) => !isStandaloneDeclaration(d));

  for (const standaloneItem of standaloneItems) {
    if (!hasImport(imports, standaloneItem)) {
      imports.push(standaloneItem);
    }
  }

  const commonTestImports = [
    HttpClientTestingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterTestingModule,
  ];

  for (const commonImport of commonTestImports) {
    if (!hasImport(imports, commonImport)) {
      imports.push(commonImport);
    }
  }

  if (!hasSchema(schemas, CUSTOM_ELEMENTS_SCHEMA)) {
    schemas.push(CUSTOM_ELEMENTS_SCHEMA);
  }

  if (!hasSchema(schemas, NO_ERRORS_SCHEMA)) {
    schemas.push(NO_ERRORS_SCHEMA);
  }

  patched.imports = imports;
  patched.schemas = schemas;

  return originalConfigureTestingModule(patched) as TestBed;
};

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
