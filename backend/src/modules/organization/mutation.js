
export const updateOrganizationTrainerDescription = async (_, { description, organization_id, trainer_id }, { dbConnection }) => {
    const updateResponse = await dbConnection.query(`UPDATE organization_trainer 
                                                     SET description = ? 
                                                     WHERE organization_trainer.organization_id = ? AND organization_trainer.trainer_id = ?`, 
                                                     [description, organization_id, trainer_id]);

    return updateResponse.affectedRows === 1;
};