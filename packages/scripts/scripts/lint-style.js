/**
 * External dependencies
 */
const { sync: spawn } = require( 'cross-spawn' );
const { sync: resolveBin } = require( 'resolve-bin' );

/**
 * Internal dependencies
 */
const {
	fromConfigRoot,
	getCliArgs,
	hasCliArg,
	hasFileInCliArgs,
	hasProjectFile,
	hasPackageProp,
} = require( '../utils' );

const args = getCliArgs();

const defaultFilesArgs = ! hasFileInCliArgs ? [ '**/*.{css,scss}' ] : [];

const hasStylelintConfig = hasCliArg( '--config' ) ||
	hasProjectFile( '.stylelintrc' ) ||
	hasProjectFile( '.stylelintrc.js' ) ||
	hasProjectFile( '.stylelintrc.json' ) ||
	hasProjectFile( '.stylelintrc.yaml' ) ||
	hasProjectFile( '.stylelintrc.yml' ) ||
	hasProjectFile( '.stylelint.config.js' ) ||
	hasPackageProp( 'stylelint' );

const defaultConfigArgs = ! hasStylelintConfig ?
	[ '--config', fromConfigRoot( '.stylelintrc.json' ) ] :
	[];

const result = spawn(
	resolveBin( 'stylelint' ),
	[ ...defaultConfigArgs, ...args, ...defaultFilesArgs ],
	{ stdio: 'inherit' }
);

process.exit( result.status );
