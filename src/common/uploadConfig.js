export const config = {
  	quality: 1.0,
  	maxWidth: 500,
  	maxHeight: 500,
  	storageOptions: {
    	skipBackup: true,
  	},
};

export const option = {
	title: i18n.t('uploadConfig.title'),
	cancelButtonTitle: i18n.t('uploadConfig.close'),
	takePhotoButtonTitle: i18n.t('uploadConfig.pai'),
	chooseFromLibraryButtonTitle: i18n.t('uploadConfig.ben'),
	quality: 1.0,
	allowEditing: true,
	noData: false,
	storageOptions: {
		skipBackup: true
	}
}